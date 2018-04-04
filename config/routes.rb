Rails.application.routes.draw do
  get 'users/search'
  devise_for :users

  namespace :api, { format: 'json' } do
    resources :messages
  end

  resources :users, :only => [:index, :show]
  resources :messages
  root to: 'messages#index'

end
