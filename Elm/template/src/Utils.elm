module Utils exposing (..)

import Array exposing (..)
import List.Extra exposing (getAt, removeAt)
import Random exposing (Seed, int, step)
import Types exposing (..)


arrayFilterMap : a -> Array (Maybe a) -> Array a
arrayFilterMap default arr =
    Array.filter
        (\t ->
            case t of
                Just a ->
                    True

                Nothing ->
                    False
        )
        arr
        |> Array.map
            (\t ->
                case t of
                    Just a ->
                        a

                    Nothing ->
                        default
            )


shuffleList : Seed -> List a -> ( List a, Seed )
shuffleList seed list =
    shuffleListHelper seed list []


shuffleListHelper : Seed -> List a -> List a -> ( List a, Seed )
shuffleListHelper seed source result =
    if List.isEmpty source then
        ( result, seed )

    else
        let
            indexGenerator =
                int 0 (List.length source - 1)

            ( index, nextSeed ) =
                step indexGenerator seed

            valAtIndex =
                getAt index source

            sourceWithoutIndex =
                removeAt index source
        in
        case valAtIndex of
            Just val ->
                shuffleListHelper nextSeed sourceWithoutIndex (val :: result)

            Nothing ->
                ( [], nextSeed )
