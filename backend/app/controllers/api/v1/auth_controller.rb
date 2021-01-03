module Api
  module V1
    class AuthController < ApplicationController
      include JwtAuthenticator

      def login
        @user = User.find_by(name: params[:name], password: params[:password])
        if @user
          jwt_token = encode(@user.id)
          response.headers['X-Authentication-Token'] = jwt_token
          render json: @user
        else
          render json: {status: 'ERROR', message: "ログイン名またはパスワードが誤っています。"}
        end
      end

      def create
        @user = User.new(name: params[:name], password: params[:password])
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
