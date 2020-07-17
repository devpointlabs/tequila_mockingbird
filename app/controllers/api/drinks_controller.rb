class Api::DrinksController < ApplicationController

  def index
    render json: Drink.all
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
    if drink.update(drink_params)
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
    binding.pry
    render json: { mesage: 'boozedrink Deleted'}
  end

  private
    def drink_params
      params.require(:drink).permit(:name, :history, :prep_serv, :ingredients)
    end
end
