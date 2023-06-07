from aiogram import Bot, Dispatcher, types, executor
from aiogram.dispatcher import FSMContext
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.dispatcher.filters import Command
import requests
import asyncio
import logging


BOT_TOKEN = '5811197268:AAFrbDGPBtgo9UWefZx8TOYqvoi9FQFONyI'

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(bot=bot)
storage = MemoryStorage()


@dp.message_handler(content_types=['photo'], state='*')
async def handle_photo(message: types.Message):
    photos = message.photo
    photos_list = [types.InputMediaPhoto(photo.file_id) for photo in photos]
    await bot.send_media_group(chat_id=message.chat.id, media=photos_list)
    

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    try:
        loop.create_task(dp.start_polling())
        loop.run_forever()
    finally:
        loop.close()