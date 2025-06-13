import { FeedStateInterface } from '../types/feedState.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { feedActions } from './actions';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
      initialState,
      on(feedActions.getFeed, (state) => ({...state, isLoading: true, error: null})),
      on(feedActions.getFeedSuccess, (state, action) => ({...state, isLoading: false, data: action.feed, error: null})),
      on(feedActions.getFeedFailure, (state) => ({...state, isLoading: false, error: state.error })),
  ),
});

export const {name: feedFeatureKey, reducer: feedReducer, selectIsLoading, selectError, selectData } = feedFeature;
