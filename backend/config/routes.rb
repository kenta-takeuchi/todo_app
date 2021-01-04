Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :tasks
      post 'login' , to: 'auth#login'
      post 'user/create/', to: 'auth#create'
      post 'user/delete/', to: 'auth#delete'
      get 'user/list/', to: 'auth#get_users'
      get 'category/list', to: 'category#get_categories'
    end
  end
end
