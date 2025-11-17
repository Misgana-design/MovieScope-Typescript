import { useReducer } from "react";
import {loadFromLocalStorage} from '../hook/useLocalStorage.ts' 

function reducer(state, action) {}

const {state, dispatch} = useReducer(reducer, loadFromLocalStorage) {}
