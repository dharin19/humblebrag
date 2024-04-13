from openai import AsyncOpenAI
import os
import asyncio
           

async def get_completion(message):
    client = AsyncOpenAI()

    completion = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{f"role": "user", "content": f"{message}"}]
    )
    return completion

completion = asyncio.run(get_completion("INSERT MESSAGE HERE"))
completion = completion.choices[0].message.content
print(completion)