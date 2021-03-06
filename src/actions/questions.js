import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const QUESTION_ANSWER = 'QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
  return {
    type: 'ADD_QUESTION',
    question
  }
}

export function handleAddQuestion (text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion ({
      text,
      author: authedUser,
      replyingTo
    })
    .then( (question) => dispatch( addQuestion(question) ))
    .then( () => dispatch( hideLoading() ))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}


function questionAnswer ({ id, authedUser, hasLiked }) {
  return {
    type: QUESTION_ANSWER,
    id,
    authedUser,
    hasLiked
  }
}

export function handleQuestionAnswer (info) {
  return (dispatch) => {
    dispatch(questionAnswer(info))

    return saveQuestionAnswer(info)
      .catch( (e) => {
        console.warn('Error in handleToggleTweet: ', e)
        dispatch(questionAnswer(info))
        alert('The error liking tweet, try again')
      })
  }
}
