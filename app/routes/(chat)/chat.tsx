import { createFileRoute } from '@tanstack/react-router';
import { convertToCoreMessages, streamText, Message } from 'ai';
import { useChat } from 'ai/react';
import { createServerFn } from '@tanstack/start';
import { openai } from '@ai-sdk/openai';

const chat = createServerFn({ method: 'POST' })
  // .validator((messages: Message[]) => messages)
  .validator((message: unknown): Message => {
    return message as Message;
  })
  .handler(async ({ data }) => {
    console.log('handler:', data);
    // const result = await streamText({
    //   model: openai('gpt-4-turbo'),
    //   messages: convertToCoreMessages(messages),
    // });
    // return result.toDataStreamResponse();
    return {};
  });

export const Route = createFileRoute('/(chat)/chat')({
  loader: async () => {
    console.log('loader');
  },
  component: RouteComponent,
});

const fetch: typeof window.fetch = async (input, init) => {
  console.log('fetch:', input, init);
  // const response = await chat(JSON.parse(init!.body as string));
  // return new Response(JSON.stringify(response), {
  //   headers: { 'Content-Type': 'application/json' },
  // });
  return chat(JSON.parse(init!.body as string));
};

function RouteComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    fetch,
  });
  return (
    <div>
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}
      Hello "/(chat)/chat"!
      <form onSubmit={handleSubmit} className="fixed bottom-0 mb-8 w-3/4">
        <input
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
