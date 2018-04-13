Rails.application.routes.draw do
  get 'friendships/create'
  post 'friendships/delete'
  get 'users/search'

  get 'api/friendships/get_friend'
  get 'api/users/get_current_user'
  get 'api/users/search'

  devise_for :users

  namespace :api, {format: 'json'} do
    resources :messages
    resources :users
  end

  resources :users, :only => [:index, :show]
  resources :messages
  root to: 'messages#index'

end
