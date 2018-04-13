module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.where('sender_id=? and receiver_id=? or sender_id=? and receiver_id=? ', params[:sender_id], params[:receiver_id], params[:receiver_id], params[:sender_id])
      render json: @messages.order(:created_at)
    end

    def create # messageのアップロード

      picture = params[:picture]

      if picture
        filepath = "#{Rails.root}/public/#{SecureRandom.uuid}.jpg"
        f = File.open(filepath, 'wb')
        f.write(picture.read)
        f.close()
      end

      message = Message.create(sender_id: params[:sender_id], receiver_id: params[:receiver_id], content: params[:content], picture: params[:picture])
      render json: message

    end

  end

end