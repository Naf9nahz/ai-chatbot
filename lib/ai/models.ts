import { openai } from '@ai-sdk/openai';
import { fireworks } from '@ai-sdk/fireworks';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { customProvider, extractReasoningMiddleware, wrapLanguageModel } from 'ai';

export const DEFAULT_CHAT_MODEL: string = 'deepseek';

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
});

export const myProvider = customProvider({
  languageModels: {
    'deepseek-model': deepseek('deepseek-chat'),
    // 'chat-model-small': openai('gpt-4o-mini'),
    // 'chat-model-large': openai('gpt-4o'),
    'chat-model-reasoning': wrapLanguageModel({
      model: fireworks('accounts/fireworks/models/deepseek-r1'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': openai('gpt-4o-mini'),
    // 'artifact-model': openai('gpt-4o-mini'),
  },
  // imageModels: {
  //   'small-model': openai.image('dall-e-2'),
  //   'large-model': openai.image('dall-e-3'),
  // },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'deepseek',
    name: 'DeepSeek Model',
    description: 'DeepSeek Model',
  },
  // {
  //   id: 'chat-model-small',
  //   name: 'Small model',
  //   description: 'Small model for fast, lightweight tasks',
  // },
  // {
  //   id: 'chat-model-large',
  //   name: 'Large model',
  //   description: 'Large model for complex, multi-step tasks',
  // },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning model',
    description: 'Uses advanced reasoning',
  },
];
