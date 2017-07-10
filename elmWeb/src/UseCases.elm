port module UseCases exposing (..)


port play : ( String, String ) -> Cmd msg


port translate : String -> Cmd msg


port history : () -> Cmd msg
