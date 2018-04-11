module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      message = Message.create(sender_id: params[:sender_id], receiver_id: params[:receiver_id], content: params[:content])
      render json: message
    end

  end

end