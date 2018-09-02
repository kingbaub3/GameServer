import { applyMiddleware, createStore, Store, Reducer, Unsubscribe } from 'redux';
import { GameAction } from './actions';

/**
 * This class holds the game state for a match. 
 * T: An object that represents your game state.
 */
export class GameState<T> {
    private _store: Store<T, GameAction>;

    constructor(parentReducer: Reducer, middleware?: any) {
        if(!parentReducer) {
            console.error("A reducer must be given to the game state in order")
        }

        if(middleware) {
            this._store = createStore(parentReducer, applyMiddleware(middleware));
        }
        else {
            this._store = createStore(parentReducer);
        }
    }
    
    getState(): T {
        return this._store.getState();
    }
    
    dispatch(action: GameAction): void {
        this._store.dispatch(action);
    }

    subscribe(callback: () => void): Unsubscribe {
        return this._store.subscribe(callback);
    }
}