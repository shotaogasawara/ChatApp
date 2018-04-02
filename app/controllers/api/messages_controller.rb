module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      Message.create(message: params[:message])
      redirect_to '/'
    end
  end

end