module Api
  module V1
    class CategoryController < ApplicationController
      include JwtAuthenticator
      def get_categories
        @categories = Category.all.order(id: :asc)
        render json: { status: 'SUCCESS', message: "Loaded categories", data: @categories }
      end
    end
  end
end


