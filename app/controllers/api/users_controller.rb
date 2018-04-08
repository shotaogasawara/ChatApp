module Api
  class UsersController < ApplicationController

    def index
      @users = User.all
      render json: @users
    end

    def search
      str = params[:user_name]
      @users = User.where('name LIKE ?', "%#{str}%") # 曖昧検索(サニタイズ有り)
      # @users = User.where('name LIKE ?', "%#{sanitize_sql_like(str)}%") # 曖昧検索(サニタイズ有り)
      render json: @users
    end
  end

end