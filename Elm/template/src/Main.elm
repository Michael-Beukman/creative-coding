module Main exposing (main)

import Browser exposing (..)
import Browser.Events exposing (..)
import Canvas.Texture as Texture
import Dict exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Keys exposing (..)
import Random exposing (..)
import Render exposing (..)
import Tuple3 exposing (..)
import Types exposing (..)
import Utils exposing (..)
import Values exposing (..)


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MSG
-- MODEL
-- init


init : { startTime : Float, winWidth : Int, winHeight : Int } -> ( Model, Cmd msg )
init { startTime, winWidth, winHeight } =
    let
        minW =
            if winHeight < winWidth then
                winHeight

            else
                winWidth

        whichwidth =
            if winHeight < winWidth then
                mapheight

            else
                mapwidth

        tilewidth =
            toFloat (1 * minW) / whichwidth

        s =
            Debug.log "asdasdasd " ( minW, whichwidth, tilewidth )

        tileheight =
            tilewidth

        sHeight =
            round (tileheight * mapheight)

        sWidth =
            round (tilewidth * mapwidth)
    in
    ( { timeToGo = timebeforeupdate
      , gameOver = False
      , screen = Screen sWidth sHeight tilewidth tileheight
      , frame = 0
      , timeSoFar = 0
      }
    , Cmd.none
    )



-- UPDATE


pointrandom : Random.Generator ( Int, Int )
pointrandom =
    Random.pair (Random.int 0 (mapwidth - 1)) (Random.int 0 (mapheight - 1))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Frame time ->
            let
                t =
                    model.timeToGo - time

                newtime =
                    if t < 0 then
                        timebeforeupdate

                    else
                        t

                frame =
                    if t < 0 then
                        modBy 3 (model.frame + 1)

                    else
                        model.frame
            in
            ( { model | timeToGo = newtime, frame = frame, timeSoFar = model.timeSoFar + time }, Cmd.none )

        Move dir ->
            if dir == Space && model.gameOver then
                init { startTime = 1.0, winHeight = model.screen.height, winWidth = model.screen.width }

            else
                ( model, Cmd.none )



-- VIEW


view : Model -> Html Msg
view model =
    div
        [ style "display" "flex"
        , style "justify-content" "center"
        , style "align-items" "center"
        ]
        ([]
            ++ (if model.gameOver then
                    [ div [] [ text "game over. Space to restart" ] ]

                else
                    [ div [ style "left" "0px", style "position" "absolute" ] [ text ("score: " ++ String.fromInt 1) ]
                    , renderMap model.screen.tileWidth
                        model.screen.tileHeight
                        model.screen.width
                        model.screen.height
                        mapwidth
                        mapheight
                        model
                    ]
               )
        )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ onKeyDown keyDecoder
        , onAnimationFrameDelta Frame
        ]
