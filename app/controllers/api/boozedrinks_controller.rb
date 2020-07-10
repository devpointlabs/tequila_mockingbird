class Api::BoozedrinksController < ApplicationController
  before_action :set_drink
  before_action :set_boozedrink, only: [:show, :edit, :update, :destroy]

  def index
    render json: @drink.boozedrinks.all
  end

  def create
   
    bd = Boozedrink.new
    binding.pry
    boozedrink = @drink.boozedrinks.new(boozedrink_params)
    binding.pry
    if boozedrink.save
      render json: boozedrink
    else
      render json: { meesage: "Unable to create Booze"}
    end
  end

  def update
    @boozedrink = @drink.boozedrink.find(params[:id])
    if @drink.boozedrink.update(@drink.boozedrink_params)
      render json: @drink.boozedrink
    else
      render json: { message: "drink not updated" }
    end
  end
      

  def destroy
    @drink.boozedrink.find(params[:id]).destroy
    render json: { mesage: 'Drink Deleted'}
  end
  


  private

  def set_drink
    @drink = Drink.find(params[:drink_id])
  end

  def set_boozedrink
    @boozedrink = @booze.boozedrinks.find(params[:id])
  end
  
  def boozedrink_params
    params.require(:boozedrink).permit(:booze_id, :drink_id)
  end


end

