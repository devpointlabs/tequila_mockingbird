# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :reviews, through: :boozedrinks
  has_associated_audits

  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
end
