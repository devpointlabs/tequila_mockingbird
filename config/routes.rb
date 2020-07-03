Rails.application.routes.draw do
 user
  mount_devise_token_auth_for 'User', at: 'api/auth'
end

  namespace :api do
    resources :boozes
  end
 
end



