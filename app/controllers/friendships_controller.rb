class FriendshipsController < ApplicationController
  def create
    @to_user_id = params[:user_id]
    fs = Friendship.new(from_user_id: current_user.id, to_user_id: @to_user_id) # friendshipを作成
    fs.save
    redirect_to '/'
  end

  def delete
    @to_user_id = params[:user_id]
    fs = Friendship.find_by(from_user_id: current_user.id, to_user_id: @to_user_id)
    fs.destroy
    redirect_to '/'
  end

end
