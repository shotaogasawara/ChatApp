module Api
  class FriendshipsController < ApplicationController

    def get_friend
      friends = current_user.friends
      render json: friends
    end
  end

end