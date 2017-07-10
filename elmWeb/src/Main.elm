module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (type_, id, name, value)
import Html.Events exposing (onInput, onSubmit)
import Observer exposing (Round)
import UseCases


type alias Model =
    { message : String
    , p1 : String
    , p2 : String
    , history : List Round
    }


type Msg
    = HandleP1Change String
    | HandleP2Change String
    | Play
    | ReceiveResult String
    | ReceiveMessage String
    | ReceiveRounds (List Round)


initialModel : Model
initialModel =
    { message = ""
    , p1 = ""
    , p2 = ""
    , history = []
    }


initialCmd : Cmd Msg
initialCmd =
    UseCases.history ()


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        HandleP1Change p1 ->
            ( { model | p1 = p1 }, Cmd.none )

        HandleP2Change p2 ->
            ( { model | p2 = p2 }, Cmd.none )

        Play ->
            ( model, UseCases.play ( model.p1, model.p2 ) )

        ReceiveResult result ->
            ( model, Cmd.batch [ UseCases.translate result, UseCases.history () ] )

        ReceiveMessage message ->
            ( { model | message = message }, Cmd.none )

        ReceiveRounds rounds ->
            ( { model | history = rounds }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Observer.invalid (receiveResult "invalid")
        , Observer.tie (receiveResult "tie")
        , Observer.p1Wins (receiveResult "p1_wins")
        , Observer.p2Wins (receiveResult "p2_wins")
        , Observer.rounds ReceiveRounds
        , Observer.norounds receiveNoRounds
        , Observer.message ReceiveMessage
        ]


receiveResult : String -> a -> Msg
receiveResult result _ =
    ReceiveResult result


receiveNoRounds : a -> Msg
receiveNoRounds _ =
    ReceiveRounds []


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text model.message ]
        , form [ onSubmit Play ]
            [ input [ name "p1", id "p1ThrowInput", value model.p1, onInput HandleP1Change ] []
            , input [ name "p2", id "p2ThrowInput", value model.p2, onInput HandleP2Change ] []
            , button [ id "playButton", type_ "submit" ] [ text "Play" ]
            ]
        , ul [] (List.map roundRow model.history)
        ]


roundRow : Round -> Html Msg
roundRow round =
    li [] [ text (round.p1Throw ++ " " ++ round.p2Throw ++ " " ++ round.winner) ]


main : Program Never Model Msg
main =
    Html.program
        { init = ( initialModel, initialCmd )
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
