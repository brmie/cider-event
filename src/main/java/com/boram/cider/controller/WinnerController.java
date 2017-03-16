package com.boram.cider.controller;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.boram.cider.domain.EntryVO;
import com.boram.cider.service.WinnerService;

/**
 * Handles requests for the application home page.
 */
@Controller
@RequestMapping("/winner")
public class WinnerController {
	
	@Inject
	private WinnerService service;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String cider(Model model) throws Exception {
		return "redirect:/winner/list";
	}
	
	// 당첨자 리스트
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String listWinner(Model model) throws Exception {
		model.addAttribute("winners", service.listWinner());
		return "winner";
	}
	
	@RequestMapping(value = "/update/{entry_winner}" )
	public String updateWinner() throws Exception {
		return "redirect:/cider/list";
	}
	
}
