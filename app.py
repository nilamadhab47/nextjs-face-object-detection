import os 
import numpy as np
import json 
import flask 
import flask_cors as cors 
from flask import request, jsonify
import base64 
import time 
# from image_captioning import ImageCaptioning
# from lensLanguageModel import LensLanguageModel
from flask_socketio import SocketIO, emit

from PIL import Image
import io
import string, random

app = flask.Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
# socketio = SocketIO(app, engineio_logger=True, ping_timeout=5, ping_interval=5, cors_allowed_origins="*")


# image_cap = ImageCaptioning()
# text_model = LensLanguageModel()


def get_random_string(length):
    letters = string.ascii_letters
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str


@socketio.on('connect')
def handle_connect():
    print("Client connected.")

@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected.")
    

# @app.route('/new_face', methods=['POST'])
@socketio.on('new_face')

def new_face(data):
    start_time = time.time()
    image = data['image']
    face_id = get_random_string(10)
    image_bytes = base64.b64decode(image.split(",")[1])
    image_pil = Image.open(io.BytesIO(image_bytes))
    image_pil.save("hogya.png")
    # image_captioning = image_cap.get_image_description(image_pil)
    # output_text = text_model.chat_with_face(image_captioning, face_id)
    end_time = time.time()
    print("Time taken to save image: ", end_time - start_time)
    # return jsonify({
    #     'Result': "Face Registered Successfully!",
    #     'image_captioning': output_text,
    #     "face_id": face_id
    #     })
    emit('new_face_response', {
        'Result': "Face Registered Successfully!",
        'image_captioning': "Null",
        "face_id": face_id
        })


# @app.route('/conversation_llm', methods=['POST'])
@socketio.on('conversation_llm')

def conversation_llm(data):
    start_time = time.time()
    text = data['text']
    face_id = data['face_id']
    # llm_prompt = text_model.chat_with_bot(text, face_id)
    end_time = time.time()
    print("Time taken to save image adsghjuadsgjkds: ", end_time - start_time)
    # return jsonify({
    #     'llm_prompt': llm_prompt
    #     })
    emit('conversation_llm_response', {
        'llm_prompt': 'llm_prompt'
        })

# @app.route('/get_insights', methods=['POST'])
@socketio.on('get_insights')

def get_insights():
    start_time = time.time()
    data = request.get_json()
    face_id = data['face_id']
    # summary_data = text_model.dump_chat_with_user(face_id)
    # return jsonify({
    #     'insights' : summary_data
    #     })
    emit('get_insights_response', {
        'insights' : 'summary_data'
        })

# @app.route('/active_user', methods=['POST'])
@socketio.on('active_user')

def active_user(data):
    start_time = time.time()
    face_id = data['face_id']
    # active_user = text_model.get_insights(face_id)
    # return jsonify({
    #     'active_user' : active_user
    # })
    emit('active_user_response', {
        'active_user' : 'active_user'
    })

if __name__ == "__main__":
    # app.run(port=5002)
    socketio.run(app, port=5003)