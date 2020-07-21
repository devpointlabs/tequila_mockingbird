class Api::DrinksController < ApplicationController

  def index
    render json: Drink.all
  end

  def drink_boozes
    # Might change name?
    render json: Drink.find(params[:id]).boozes
  end

  def show
    render json: Drink.find(params[:id])
  end

  def create
    drink = Drink.new(drink_params)
    if drink.save
      render json: drink
    else 
      render json: { errors: drink.errors }, status: :unprocessable_entity
    end
  end

  def update
    drink = Drink.find(params[:id])
    drink.name = params[:name] ? params[:name] : drink.name
    drink.history = params[:history] ? params[:history] : drink.history
    drink.prep_serv = params[:prep_serv] ? params[:prep_serv] : drink.prep_serv
    drink.ingredients = params[:ingredients] ? params[:ingredients] : drink.ingredients
    
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

    if drink.save
      render json: drink
    else
      render json: { message: "drink not updated"}
    end
  end

  def destroy
    Drink.find(params[:id]).destroy
    render json: { mesage: 'Drink Deleted'}
  end

  def destroyBoozeDrink
    Drink.find(params[:id]).boozedrinks.destroy_all
    render json: { mesage: 'boozedrink Deleted'}
  end

  private
    def drink_params
      params.require(:drink).permit(:name, :history, :prep_serv, :ingredients, :image, )
    end
end
