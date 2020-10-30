"""
@Author Marco A. Gallegos
@Date 2020/10/09
@Description
    controlador de ejemplo para tener un endpoint que siempre responda
"""
from flask_restful import Resource, reqparse

class HelloWorld(Resource):
    def post(self):
        return {
            "hello" : "world"
        }