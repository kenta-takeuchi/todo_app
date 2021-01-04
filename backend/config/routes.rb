Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :tasks
      post 'login' , to: 'auth#login'
      post 'user/create/', to: 'auth#create'
      post 'user/delete/', to: 'auth#delete'
      get 'user/all/', to: 'auth#get_users'
    end
  end
end
