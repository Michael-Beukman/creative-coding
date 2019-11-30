module Render exposing (..)

import Array exposing (..)
import Canvas exposing (..)
import Canvas.Settings exposing (..)
import Canvas.Settings.Advanced exposing (..)
import Canvas.Settings.Text exposing (..)
import Canvas.Texture as Texture exposing (..)
import Color exposing (..)
import Dict
import Html exposing (..)
import Html.Attributes exposing (..)
import Types exposing (..)
import Utils exposing (..)
import Values exposing (..)


renderMap : Float -> Float -> Int -> Int -> Int -> Int -> Model -> Html Msg
renderMap tileW tileH screenwidth screenheight width height model =
    Canvas.toHtml
        ( screenwidth, screenheight )
        [ style "border" "10px solid rgba(0,0,0,0.1)" ]
        ([ clearScreen screenwidth screenheight ]
            ++ squares model ( toFloat screenheight / 4, toFloat screenheight / 4 ) (toFloat screenheight / 2)
        )


clearScreen screenwidth screenheight =
    shapes [ fill Color.white ] [ rect ( 0, 0 ) (toFloat screenwidth) (toFloat screenheight) ]


squares : Model -> ( Float, Float ) -> Float -> List Canvas.Renderable
squares model translatePos width =
    let
        n =
            10000

        x =
            model.timeSoFar

        y =
            (if x == 0 then
                1

             else
                x
            )
                / n
                * 1
    in
    [ shapes
        [ stroke
            Color.black
        , transform [ translate (Tuple.first translatePos) (Tuple.second translatePos) ]
        ]
        [ rect ( 0, 0 ) width width ]
    ]
        ++ (if width < 10 then
                []

            else
                List.map
                    (\( w, h ) ->
                        squares model ( Tuple.first translatePos + 1 * width / 4 + w * width / y, Tuple.second translatePos + 1 * width / 4 + h * width / y ) (width / 2)
                    )
                    [ ( -1, -1 )
                    , ( -1, 1 )
                    , ( 1, -1 )
                    , ( 1, 1 )
                    ]
                    |> List.foldl (++) []
           )
