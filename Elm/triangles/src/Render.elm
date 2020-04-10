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
            ++ triangles model ( 500, 500 ) 100
        )


clearScreen screenwidth screenheight =
    shapes [ fill Color.white ] [ rect ( 0, 0 ) (toFloat screenwidth) (toFloat screenheight) ]


triangles : Model -> ( Float, Float ) -> Float -> List Canvas.Renderable
triangles model translatePos width =
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

        z =
            4
    in
    [ shapes
        [ stroke
            Color.black
        , transform [ translate (Tuple.first translatePos) (Tuple.second translatePos) ]
        ]
        -- [ rect ( 0, 0 ) width width ]
        [ path ( 0, 0 ) [ lineTo ( -width / 2, sqrt 2 * width / 2 ), lineTo ( width / 2, sqrt 2 * width / 2 ), lineTo ( 0, 0 ) ] ]
    ]
        ++ (if width < 100 then
                []

            else
                List.map
                    (\( w, h ) ->
                        triangles model ( Tuple.first translatePos + 1 * width / 4 + w * width / z, Tuple.second translatePos + 1 * width / 8 + h * width / z ) (width / 2)
                    )
                    [ ( -1, -1 )

                    -- , ( -1, 1 )
                    -- , ( 1, -1 )
                    , ( 1, 1 )
                    ]
                    |> List.foldl (++) []
           )
