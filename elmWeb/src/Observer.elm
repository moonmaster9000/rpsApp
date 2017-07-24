port module Observer exposing (..)

import Json.Encode exposing (Value)


port invalid : (Value -> msg) -> Sub msg


port tie : (Value -> msg) -> Sub msg


port p1Wins : (Value -> msg) -> Sub msg


port p2Wins : (Value -> msg) -> Sub msg


port norounds : (Value -> msg) -> Sub msg


port rounds : (List Round -> msg) -> Sub msg


port message : (String -> msg) -> Sub msg


type alias Round =
    { p1Throw : String
    , p2Throw : String
    , winner : String
    }
