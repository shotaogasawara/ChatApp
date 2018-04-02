Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    resources :messages
  end

  resources :messages
  root to: 'messages#index'

#  root 'messages#index'

end
