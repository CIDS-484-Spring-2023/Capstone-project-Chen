import json
import string
from flask import Flask
from flask import render_template
from flask import redirect
from flask import url_for, request
import random

app = Flask(__name__)
# current_lobies = {}
players = []
game_state = {
    "board": [[" " for _ in range(7)] for _ in range(6)],
    "currentPlayer": "R",
    "gameOver": False,
    "currentColumns": [5, 5, 5, 5, 5, 5, 5],
}


@app.route("/")
def hellowoirld():
    return "<h1> hellow world!!!</h1>"


@app.get("/game")
def single_game():
    return render_template("game.html", players=players, game_state=game_state)


@app.post("/game")
def update_single_game():
    # nice security "feature"
    global game_state
    game_state = request.get_json()
    return ("", 204)


@app.get("/lobby")
def signup_form():
    return render_template("room_form.html")


@app.post("/lobby")
def post_form():
    # randomID = "".join(random.choices(string.ascii_letters + string.digits, k=10))

    global players
    global game_state
    players = {}
    playername = request.form["name"]
    player_color = request.form["color"]
    players[playername] = player_color
    game_state = {
        "board": [[" " for _ in range(7)] for _ in range(6)],
        "currentPlayer": "R",
        "gameOver": False,
        "currentColumns": [5, 5, 5, 5, 5, 5],
    }
    return redirect(url_for("single_game"))
