module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      message = Message.create(message: params[:message])
      render json: message
    end
  end

end