"""
@Author Marco A. Gallegos
@Date 2020/10/09
@Description
    controlador de ejemplo para tener un endpoint que siempre responda
"""
from flask_restful import Resource, reqparse
from .analizador_lexico import analizador_lexico

parser = reqparse.RequestParser()
parser.add_argument('sourceCode')

class HelloWorld(Resource):
    def post(self):
      args = parser.parse_args()
      return analizador_lexico(args['sourceCode'])