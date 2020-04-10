module Types exposing (..)

import Array exposing (..)
import Canvas.Texture exposing (..)
import Dict exposing (Dict)


type alias Vec2 =
    { x : Int, y : Int }


type alias Vec2f =
    { x : Float, y : Float }


type alias Screen =
    { width : Int
    , height : Int
    , tileWidth : Float
    , tileHeight : Float
    }


type alias Model =
    { timeToGo : Float
    , gameOver : Bool
    , screen : Screen
    , frame : Int
    , timeSoFar : Float
    }


type Direction
    = Up
    | Down
    | Left
    | Right
    | None
    | Space


type Msg
    = Move Direction
    | Frame Float


vecstuff : (Int -> Int -> Int) -> Vec2 -> Vec2 -> Vec2
vecstuff op v1 v2 =
    Vec2 (op v1.x v2.x) (op v1.y v2.y)


add =
    vecstuff (+)


vecfstuff : (Float -> Float -> Float) -> Vec2f -> Vec2f -> Vec2f
vecfstuff op v1 v2 =
    Vec2f (op v1.x v2.x) (op v1.y v2.y)


addf =
    vecfstuff (+)


multf : Float -> Vec2f -> Vec2f
multf num vec =
    Vec2f (vec.x * num) (vec.y * num)


mult num vec =
    Vec2 (vec.x * num) (vec.y * num)


vecToInt : Vec2f -> Vec2
vecToInt v =
    Vec2 (round v.x) (round v.y)


toFloatVec : Vec2 -> Vec2f
toFloatVec v =
    Vec2f (toFloat v.x) (toFloat v.y)
