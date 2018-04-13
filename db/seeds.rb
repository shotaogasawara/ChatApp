User.create!(name: "shota",
             email: "shota@prog-8.com",
             password: "foobar",
             password_confirmation: "foobar"
)

10.times do |n|
  name = Faker::Name.name
  email = "example-#{n+1}@prog-8.com"
  password = "password"
  User.create!(name: name,
               email: email,
               password: password,
               password_confirmation: password
               )
end

# # create micropost
# users = User.order(:created_at).take(6)
# 50.times do
#   content = Faker::Lorem.sentence(5)
#   users.each { |user| user.microposts.create!(content: content) }
# end
#
# # create relationships
# users = User.all
# user = users.first
# following = users[2..50]
# followers = users[3..40]
# following.each { |followed| user.follow(followed)}
# followers.each { |follower| follower.follow(user)}
