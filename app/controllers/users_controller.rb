class UsersController < ApplicationController
  def index
    @users = User.all
    # debugger
  end

  def show
    @user = User.find(params[:id])
  end
end
