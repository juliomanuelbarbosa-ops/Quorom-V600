import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";
import { StateGraph, END } from "@langchain/langgraph";
import dotenv from "dotenv";

dotenv.config();

// Define the Shared State
interface AgentState {
  task: string;
  market_data: string;
  sentiment_analysis: string;
  math_validation: string;
  final_output: string;
  messages: BaseMessage[];
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- LangGraph Agent Setup ---
  const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-3-flash-preview",
    apiKey: process.env.GEMINI_API_KEY,
  });

  const grokNode = async (state: AgentState) => {
    const response = await model.invoke([
      new HumanMessage("You are Grok 4.20. Analyze the sentiment for: NBA Finals Arbitrage. Be edgy and fun. Return a short sentiment summary.")
    ]);
    return {
      sentiment_analysis: response.content as string,
      messages: [new AIMessage({ content: `Grok Sentiment: ${response.content}`, name: 'grok' })]
    };
  };

  const geminiNode = async (state: AgentState) => {
    const response = await model.invoke([
      new HumanMessage("You are Gemini 3 Pro. Parse this raw market data: 'DraftKings ML +150 | FanDuel ML -140'. Return a structured string of the odds.")
    ]);
    return {
      market_data: response.content as string,
      messages: [new AIMessage({ content: `Gemini Data: ${response.content}`, name: 'gemini' })]
    };
  };

  const deepseekNode = async (state: AgentState) => {
    const response = await model.invoke([
      new HumanMessage(`You are DeepSeek R1. Calculate the arbitrage EV for these odds: ${state.market_data}. Show the math briefly.`)
    ]);
    return {
      math_validation: response.content as string,
      messages: [new AIMessage({ content: `DeepSeek Math: ${response.content}`, name: 'deepseek' })]
    };
  };

  const claudeNode = async (state: AgentState) => {
    const response = await model.invoke([
      new HumanMessage(`You are Claude 4.5 Sonnet. Verify this logic: ${state.math_validation}. Is it sound? Be concise.`)
    ]);
    return {
      messages: [new AIMessage({ content: `Claude Verification: ${response.content}`, name: 'claude' })]
    };
  };

  const gptNode = async (state: AgentState) => {
    const payloadPrompt = `
      You are GPT-5.2. Format a JSON payload with these inputs:
      Insight: ${state.sentiment_analysis}
      Edge: ${state.math_validation}
      
      Return ONLY valid JSON with keys: status, insight, edge.
    `;
    const response = await model.invoke([new HumanMessage(payloadPrompt)]);
    const cleanJson = (response.content as string).replace(/```json/g, '').replace(/```/g, '').trim();
    return {
      final_output: cleanJson,
      messages: [new AIMessage({ content: "Payload formatted.", name: 'gpt' })]
    };
  };

  const workflow = new StateGraph<AgentState>({
    channels: {
      task: { reducer: (x: string) => x ?? "" },
      market_data: { reducer: (x: string, y: string) => y ?? x ?? "" },
      sentiment_analysis: { reducer: (x: string, y: string) => y ?? x ?? "" },
      math_validation: { reducer: (x: string, y: string) => y ?? x ?? "" },
      final_output: { reducer: (x: string, y: string) => y ?? x ?? "" },
      messages: {
        reducer: (a: BaseMessage[], b: BaseMessage[]) => a.concat(b),
        default: () => [],
      }
    }
  });

  workflow.addNode("grok", grokNode);
  workflow.addNode("gemini", geminiNode);
  workflow.addNode("deepseek", deepseekNode);
  workflow.addNode("claude", claudeNode);
  workflow.addNode("gpt", gptNode);

  workflow.addEdge("grok", "gemini");
  workflow.addEdge("gemini", "deepseek");
  workflow.addEdge("deepseek", "claude");
  workflow.addEdge("claude", "gpt");
  workflow.addEdge("gpt", END);

  workflow.setEntryPoint("grok");

  const appSwarm = workflow.compile();

  // --- API Routes ---

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/swarm/stream", async (req, res) => {
    const directive = req.query.directive as string || "Analyze Arbitrage Opportunity: NBA Finals";
    
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendEvent = (data: any) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const initialState = {
      task: directive,
      messages: [new HumanMessage("Initiate swarm protocol.")]
    };

    try {
      sendEvent({ agent: 'Orchestrator', msg: `Task received: ${directive}. Delegating to swarm...` });
      
      // Stream the graph execution
      const stream = await appSwarm.stream(initialState);
      
      for await (const chunk of stream) {
        for (const [nodeName, stateUpdate] of Object.entries(chunk)) {
          let agentName = nodeName.charAt(0).toUpperCase() + nodeName.slice(1);
          let msg = `${agentName} processed data.`;
          
          // Extract message content if available
          // @ts-ignore
          if (stateUpdate.messages && stateUpdate.messages.length > 0) {
             // @ts-ignore
             const lastMsg = stateUpdate.messages[stateUpdate.messages.length - 1];
             msg = lastMsg.content;
          }

          sendEvent({ agent: agentName, msg: msg });
          
          // If final output is ready, send it separately
          // @ts-ignore
          if (stateUpdate.final_output) {
             // @ts-ignore
             sendEvent({ type: 'FINAL_RESULT', payload: stateUpdate.final_output });
          }
        }
      }

      sendEvent({ agent: 'Orchestrator', msg: 'Consensus reached. Injecting data into Intel Feed.' });
      res.end();
    } catch (error: any) {
      console.error("Stream Error:", error);
      sendEvent({ agent: 'System', msg: `Error: ${error.message}` });
      res.end();
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
