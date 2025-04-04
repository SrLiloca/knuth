from flask import Blueprint, render_template

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/lista')
def lista():
    return render_template('lista.html')

@bp.route('/arvore')
def arvore():
    return render_template('arvore.html')

@bp.route('/hashing')
def hashing():
    return render_template('hashing.html')

@bp.route('/desafio')
def desafio():
    return render_template('desafio.html')
