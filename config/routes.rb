Rails.application.routes.draw do
  namespace :api do
    resources :boozes
    resources :drinks
  end
 
end


