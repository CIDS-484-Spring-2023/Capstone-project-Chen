import json
import string
from pprint import pp
from flask import Flask
from flask import render_template
from flask import redirect
from flask import url_for, request
import random

app = Flask(__name__)
current_lobbies = {}
all_players_color = {}
game_state = {
    "board": [[" " for _ in range(7)] for _ in range(6)],
    "currentPlayer": "R",
    "gameOver": False,
    "currentColumns": [5, 5, 5, 5, 5, 5, 5],
}


@app.route("/")
def hellowoirld():
    return "<h1> hellow world!!!</h1>"


@app.get("/game/<roomid>")
def single_game(roomid):
    pp(current_lobbies[roomid])
    return render_template("game.html", roomid=roomid, players={name:all_players_color[name] for name in current_lobbies[roomid]["players"]}, name=request.args["name"], game_state=current_lobbies[roomid])


@app.post("/game/<roomid>")
def update_single_game(roomid):
    # nice security "feature"
    global current_lobbies
    current_lobbies[roomid] = request.get_json()
    return ("", 204)


@app.get("/lobby")
def signup_form():
    return render_template("room_form.html")


@app.post("/lobby")
def post_form():
    randomID = "".join(random.choices(string.ascii_lowercase + string.digits, k=4))
    
    global all_players_color
    global current_lobbies
    pp(dict(request.form))
    playername = request.form["name"]
    color = request.form["color"]
    room = request.form["room"]
    all_players_color[playername] = color
    game_state = {
        "board": [[" " for _ in range(7)] for _ in range(6)],
        "currentPlayer": "R",
        "players": [playername],
        "gameOver": False,
        "currentColumns": [5, 5, 5, 5, 5, 5],
    }
    if(room != ""):
        current_lobbies[room]["players"].append(playername)
        return redirect(url_for("single_game",roomid=room, name=playername))
    else:
        current_lobbies[randomID] = game_state
        return redirect(url_for("single_game", roomid=randomID, name=playername))
    
@app.get("/share/<roomid>")
def share(roomid):
    return render_template("share.html", players={name:all_players_color[name] for name in current_lobbies[roomid]["players"]}, roomid=roomid)