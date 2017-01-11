package com.boram.cider.controller;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.boram.cider.domain.EntryVO;
import com.boram.cider.service.CiderService;

/**
 * Handles requests for the application home page.
 */
@Controller
@RequestMapping("/cider")
public class CiderController {
	
	@Inject
	private CiderService service;
	private static final Logger logger = LoggerFactory.getLogger(CiderController.class);
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String cider(Model model) throws Exception {
		logger.info("사이다 이벤트입니당");
		return "cider";
	}
	
	// 관리자 뷰
	@RequestMapping(value = "/entry", method = RequestMethod.GET)
	public String listEntry(Model model) throws Exception {
		List<EntryVO> entries = service.listEntry();
		model.addAttribute("entries", entries);
		return "ciderAdmin";
	}
	
	// 응모하기 버튼 클릭 시
	@RequestMapping(value = "/entry", method = RequestMethod.POST)
	public String entry(Model model, HttpServletRequest request) throws Exception {
		
		System.out.println(request.getParameter("entry_name"));
		System.out.println(request.getParameter("entry_email"));
		System.out.println(request.getParameter("entry_melody"));
		
		EntryVO entry = new EntryVO();
		
		entry.setEntry_name(request.getParameter("entry_name"));
		entry.setEntry_email(request.getParameter("entry_email"));
		entry.setEntry_melody(request.getParameter("entry_melody"));
		
		service.insertEntry(entry);
		return "redirect:/cider";
	}
	
	@ResponseBody
	@RequestMapping(value="/play/{entry_no}", method = RequestMethod.GET)
	public String playSound(@PathVariable int entry_no) throws Exception {
		return service.selectMelody(entry_no);
	}
	
}
