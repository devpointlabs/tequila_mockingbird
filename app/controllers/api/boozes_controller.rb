class Api::BoozesController < ApplicationController

  def index
    render json: Booze.all
  end

  def booze_drinks
    render json: Booze.find(params[:id]).drinks
  end

  def show 
    render json: Booze.find(params[:id])
  end

  def create
    booze = Booze.new(booze_params)
    if booze.save
      render json: booze
    else
      render json: { meesage: "Unable to create Booze"}
  end
end

  def update
    booze = Booze.find(params[:id])
    booze.name = params[:name] ? params[:name] : booze.name
    booze.history = params[:history] ? params[:history] : booze.history
    booze.production = params[:production] ? params[:production] : booze.production
    
    file = params[:file]
    # binding.pry
    if file && file != 'undefined' 
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
        drink.image = cloud_image['secure_url']
      # rescue => e
      #   render json: { errors: e }, status: 422
      end
    end

    if booze.save
      render json: booze
    else
      render json: { meesage: "Unable to create Booze"}
  end
end

  def destroy
    Booze.find(params[:id]).destroy
    render json: { message: "Destroyed the BOOZE!" }
  end

  def booze_audits
    render json:  Booze.find(params[:id]).audits
  end

  private

  def booze_params
    params.require(:booze).permit(:name, :production, :history, :is_checked, "image")
  end

end
