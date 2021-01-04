module Api
  module V1
    class AuthController < ApplicationController
      include JwtAuthenticator

      def login
        @user = User.find_by(name: params[:username], password: params[:password])
        if @user
          puts params
          jwt_token = encode(@user.id)
          render json: {data: @user, access: jwt_token}
        else
          render json: {status: 'ERROR', message: "ログイン名またはパスワードが誤っています。"}
        end
      end

      def get_users
        @users = User.all.order(id: :asc)
      end

      def create
        @user = User.new(name: params[:username], password: params[:password])
        if @user.save
          jwt_token = encode(@user.id)
          response.headers['X-Authentication-Token'] = jwt_token
          render json: @user
        end
      end

      def delete
        @user = User.find_by(id: params[:id])
        @user.destroy
        render json: { status: 'SUCCESS', message: 'Deleted the user', data: @task }
      end
    end
  end
end
