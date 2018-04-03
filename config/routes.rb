Rails.application.routes.draw do
  devise_for :users

  namespace :api, { format: 'json' } do
    resources :messages
  end

  resources :users, :only => [:index, :show]
  resources :messages
  root to: 'messages#index'

#  root 'messages#index'

end
