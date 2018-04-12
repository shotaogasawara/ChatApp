module Api
  class MessagesController < ApplicationController

    # def index
    #   @messages = Message.all
    #   render json: @messages
    # end
    def index
      @messages = Message.where('sender_id=? and receiver_id=? or sender_id=? and receiver_id=? ', params[:sender_id], params[:receiver_id], params[:receiver_id], params[:sender_id])
      render json: @messages.order(:created_at)
    end

    def create
      message = Message.create(sender_id: params[:sender_id], receiver_id: params[:receiver_id], content: params[:content])
      render json: message
    end

    # def get_chat
    #   @messages = Message.where('sender_id=? and receiver_id=? or sender_id=? and receiver_id=? ', params[:sender_id], params[:receiver_id], params[:receiver_id], params[:sender_id])
    #   render json: @messages.order(:created_at)
    # end
  end

end