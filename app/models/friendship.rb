class Friendship < ActiveRecord::Base
  belongs_to :from_user, :class_name => 'User'
  belongs_to :to_user, :class_name => 'User'
  validates :from_user_id, uniqueness: { message: ", to_user_idが同じ組み合わせのレコードが既に存在しています。", scope: [:to_user_id]} # ユニーク性制約
  validates :from_user_id, presence: true
  validates :to_user_id, presence: true
end
