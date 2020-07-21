class Api::CommentsController < ApplicationController
  before_action :set_drink
  before_action :set_comment, only: [:show, :edit, :update, :destroy]

  def index
    render json: @drink.comments
  end

  def create
    comment = @drink.comments.new(comment_params)

    file = params[:file]

    if file
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
        user.image = cloud_image['secure_url']
      rescue => e
        render json: { errors: e }, status: 422
      end
    end  

    if comment.save
        render json: comment
      else
        render json: { message: "Unable to create Comment"}
      end
  end

def update
  drink = @drink.comment.find(params[:id])
  
  file = params[:file]
  
  if file
    begin
      ext = File.extname(file.tempfile)
      cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
      user.image = cloud_image['secure_url']
    rescue => e
      render json: { errors: e }, status: 422
    end
  end
  
  if user.save
    render json: user
  else
    render json: { errors: user.errors.full_messages }, status: 422
  end
end


private

def set_drink
  @drink = Drink.find(params[:drink_id])
end

def set_comment
  @comment = @drink.comments.find(params[:id])
end

def comment_params
  params.require(:comment).permit(:review)
end

end